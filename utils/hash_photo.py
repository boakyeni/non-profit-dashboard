import hashlib


def calculate_file_hash(file, block_size=65536):
    hasher = hashlib.sha256()
    # If the file is not already in memory, it's read chunk by chunk to save memory
    if file.multiple_chunks():
        for chunk in file.chunks(block_size):
            hasher.update(chunk)
    else:
        # Read the whole file if it's not too large
        hasher.update(file.read())
    file.seek(0)  # Reset the file pointer after use
    return hasher.hexdigest()
