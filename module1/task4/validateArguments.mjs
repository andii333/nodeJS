export function validateArguments(limit, type) {
  if (isNaN(limit)) {
    console.error(
      "Error: You must specify either a file size limit in MB or a row limit."
    );
    process.exit(1);
  }

  if (type === 'type' && !isNaN(limit) && limit <= 0) {
    console.error("Error: File size limit must be greater than 0.");
    process.exit(1);
  }

  if (type === "row" && !isNaN(limit) && limit <= 0) {
    console.error("Error: Row limit must be greater than 0.");
    process.exit(1);
  }
}
