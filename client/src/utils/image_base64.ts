export function imageToBase64(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        resolve(event.target.result);
      } else {
        return;
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
