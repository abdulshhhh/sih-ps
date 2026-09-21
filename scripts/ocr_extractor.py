import os
import sys
import json
import logging
from typing import List

# Configure logging to only show errors, as we rely on stdout for JSON response
logging.getLogger().setLevel(logging.ERROR)

try:
    import fitz  # PyMuPDF
    from paddleocr import PaddleOCR
    import numpy as np
    from PIL import Image
except ImportError as e:
    print(json.dumps({
        "success": False,
        "error": f"Missing dependency. Please run: pip install paddlepaddle paddleocr pymupdf numpy pillow\nDetails: {str(e)}"
    }))
    sys.exit(1)

def extract_text_from_pdf(pdf_path: str, model_name="en_PP-OCRv5_mobile_rec") -> str:
    # Initialize PaddleOCR with English, using the specified model
    # Note: PaddleOCR downloads the model on first run if not present
    ocr = PaddleOCR(use_angle_cls=True, lang="en", show_log=False)
    
    extracted_text: List[str] = []
    
    # Open the PDF using PyMuPDF
    pdf_document = fitz.open(pdf_path)
    
    # Iterate through all pages
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        
        # Render the page to a pixmap (image)
        # Using scale for better OCR resolution (e.g., 300 DPI equivalent roughly)
        zoom = 2.0
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat)
        
        # Convert pixmap to numpy array (RGB) for PaddleOCR
        img_np = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.h, pix.w, pix.n)
        if pix.n == 4:
            # Drop alpha channel if present
            img_np = img_np[:, :, :3]
            
        # Run inference
        result = ocr.ocr(img_np, cls=True)
        
        # Process results
        for idx in range(len(result)):
            res = result[idx]
            if res is None:
                continue
            for line in res:
                # line format: [[box], (text, confidence)]
                text = line[1][0]
                extracted_text.append(text)
                
    pdf_document.close()
    return "\n".join(extracted_text)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "No input file provided"}))
        sys.exit(1)
        
    file_path = sys.argv[1]
    
    if not os.path.exists(file_path):
        print(json.dumps({"success": False, "error": f"File not found: {file_path}"}))
        sys.exit(1)
        
    try:
        # Check if it's a PDF
        if file_path.lower().endswith('.pdf'):
            text = extract_text_from_pdf(file_path)
        else:
            # Handle standard image types directly
            ocr = PaddleOCR(use_angle_cls=True, lang="en", show_log=False)
            result = ocr.ocr(file_path, cls=True)
            text_lines = []
            for idx in range(len(result)):
                res = result[idx]
                if res:
                    for line in res:
                        text_lines.append(line[1][0])
            text = "\n".join(text_lines)
            
        print(json.dumps({
            "success": True,
            "text": text
        }))
    except Exception as e:
        print(json.dumps({
            "success": False,
            "error": str(e)
        }))
        sys.exit(1)
