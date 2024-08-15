export const rowLimit = 100000;

export function validateArguments(sizeLimit) {
  if (isNaN(sizeLimit) && isNaN(rowLimit)) {
    console.error(
      "Error: You must specify either a file size limit in MB or a row limit."
    );
    process.exit(1);
  }

  if (!isNaN(sizeLimit) && sizeLimit <= 0) {
    console.error("Error: File size limit must be greater than 0.");
    process.exit(1);
  }

  if (!isNaN(rowLimit) && rowLimit <= 0) {
    console.error("Error: Row limit must be greater than 0.");
    process.exit(1);
  }
}
