export async function imageToBase64(file: File | null): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null)
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        resolve(event.target.result);
      } else {
        resolve(null)
      }
    };

    reader.onerror = (error) => {
      resolve(null)
    };

    reader.readAsDataURL(file);
  });
}
