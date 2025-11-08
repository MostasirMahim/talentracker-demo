function format_date(data) {
  const readableDate = new Date(data).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return readableDate;
}

export { format_date };
