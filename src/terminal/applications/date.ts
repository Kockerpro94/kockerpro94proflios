import { FileSystemType } from "../fileSystemBash";

export default function date(
  print: (s: string, md?: boolean) => void,
  path: FileSystemType
) {
  const docs = {
    name: "date",
    short: "print or set the system date and time",
    long: "",
  };

  const app = (args: string[], options: string[]) => {
    if (options.find((o) => o === "-h" || o === "--help")) {
      print(`\n${docs.name} – ${docs.short}`);
      return;
    }

    const d = new Date();
    print(`\n${d.toString()}`);
  };
  return { docs, app };
}
