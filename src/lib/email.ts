import nodemailer from 'nodemailer';

export async function sendBidEmail(bidDetails: any, recipientEmail: string) {
  try {
    // 1. Create a transporter
    let transporter;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Use real Gmail account if configured in .env.local
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Fallback: Generate a test account on Ethereal Email for development
      console.log('No EMAIL_USER found in .env.local. Generating test Ethereal account...');
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // 2. HTML Email Template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-w-lg mx-auto border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #1a73e8;">Bid Submitted Successfully!</h2>
        <p>Hello ${bidDetails.bidderName || 'Bidder'},</p>
        <p>Your bid for tender <strong>${bidDetails.tenderNumber}</strong> (${bidDetails.tenderTitle}) has been securely submitted and logged in the BidShield AI Vault.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Bid Details:</h3>
          <ul style="list-style-type: none; padding-left: 0; line-height: 1.6;">
            <li><strong>Bid ID:</strong> ${bidDetails.bidId}</li>
            <li><strong>Total Quoted:</strong> ${bidDetails.financialBid || bidDetails.priceBreakdown?.totalQuotedFormatted}</li>
            <li><strong>Compliance Score:</strong> ${bidDetails.complianceScore}/100</li>
            <li><strong>Local Content:</strong> ${bidDetails.localContentPercent}%</li>
          </ul>
        </div>
        
        <p>You can track the status of your bid in the BidShield AI Vendor Portal.</p>
        <p>Best regards,<br>The BidShield Platform Team</p>
      </div>
    `;

    // 3. Send the email
    const info = await transporter.sendMail({
      from: '"BidShield AI Platform" <noreply@bidshield.ai>',
      to: recipientEmail,
      subject: `Bid Submitted Successfully - ${bidDetails.tenderNumber}`,
      html: htmlContent,
    });

    console.log('Message sent: %s', info.messageId);
    
    // If using Ethereal, log the preview URL so the user can see the email
    if (!process.env.EMAIL_USER) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
