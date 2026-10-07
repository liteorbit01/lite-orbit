export type CsvExportOptions = {
  filename: string;
  headers: string[];
  rows: (string | number | boolean | null | undefined)[][];
};

function escapeCsvValue(
  value: string | number | boolean | null | undefined
): string {

  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  const stringValue =
    String(value);

  const escaped =
    stringValue.replace(
      /"/g,
      '""'
    );

  return `"${escaped}"`;

}

export function buildCsv(
  options: CsvExportOptions
): string {

  const {
    headers,
    rows,
  } = options;

  const csvRows = [

    headers.map(
      escapeCsvValue
    ).join(","),

    ...rows.map(
      (row) =>
        row
          .map(
            escapeCsvValue
          )
          .join(",")
    ),

  ];

  return csvRows.join("\n");

}

export function downloadCsv(
  options: CsvExportOptions
) {

  const csv =
    buildCsv(options);

  const blob =
    new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    options.filename;

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  URL.revokeObjectURL(
    url
  );

}