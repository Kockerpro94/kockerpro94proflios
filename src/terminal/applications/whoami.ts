import { FileSystemType } from "../fileSystemBash";

export default function whoami(
  print: (s: string, md?: boolean) => void,
  path: FileSystemType
) {
  const docs = {
    name: "whoami",
    short: "print effective userid",
    long: "",
  };

  const app = (args: string[], options: string[]) => {
    if (options.find((o) => o === "-h" || o === "--help")) {
      print(`\n${docs.name} – ${docs.short}`);
      return;
    }

    print(`\nuser`);
  };
  return { docs, app };
}
