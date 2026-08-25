import FileSystemBash, {
  FileBash,
  FileSystemType,
  FolderBash,
} from "../fileSystemBash";

export default function cat(
  print: (s: string, md?: boolean) => void,
  path: FileSystemType
) {
  const fileSystem = FileSystemBash();
  const docs = {
    name: "cat",
    short: "concatenate files and print on the standard output",
    long: "",
  };

  const app = (args: string[], options: string[]) => {
    if (options.find((o) => o === "-h" || o === "--help")) {
      print(`\n${docs.name} – ${docs.short}`);
      return;
    }

    if (args.length === 0) {
      print(`\ncat: missing operand`);
      return;
    }
    
    let allText = "";
    for (const filename of args) {
      const file = fileSystem.goto(path.p, filename)?.at(-1);
      if (!file) {
        allText += `\ncat: ${filename}: No such file or directory`;
        continue;
      }

      if (!("data" in file)) {
        allText += `\ncat: ${filename}: Is a directory`;
        continue;
      }

      allText += `\n${file.data}`;
    }
    
    print(allText, false);
  };
  return { docs, app };
}
