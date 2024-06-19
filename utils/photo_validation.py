import magic
from django.core.exceptions import ValidationError


# Function to make sure file is safe
def validate_file_type(uploaded_file):
    ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"]
    mime_type = magic.from_buffer(uploaded_file.read(1024), mime=True)
    print(mime_type)
    uploaded_file.seek(0)  # Reset file pointer after reading
    if mime_type not in ALLOWED_MIME_TYPES:
        raise ValidationError("Unsupported file type.")
