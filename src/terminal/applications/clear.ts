import { FileSystemType } from "../fileSystemBash";

export default function clear(
  print: (s: string, md?: boolean) => void,
  path: FileSystemType
) {
  const docs = {
    name: "clear",
    short: "clear the terminal screen",
    long: "",
  };

  const app = (args: string[], options: string[]) => {
    if (options.find((o) => o === "-h" || o === "--help")) {
      print(`\n${docs.name} – ${docs.short}`);
      return;
    }

    // A hacky way to clear screen: print enough newlines to scroll past the viewport
    let newlines = "";
    for (let i = 0; i < 40; i++) newlines += "\n";
    print(newlines, false);
  };
  return { docs, app };
}
