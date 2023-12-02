export const toBase64 = async (file: File | undefined) => {
  if (!file) {
    throw new Error('no file');
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};
