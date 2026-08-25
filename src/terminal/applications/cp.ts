import FileSystemBash, { FileSystemType } from "../fileSystemBash";

export default function cp(
  print: (s: string, md?: boolean) => void,
  path: FileSystemType
) {
  const fileSystem = FileSystemBash();
  const docs = {
    name: "cp",
    short: "copy files and directories",
    long: "",
  };

  const app = (args: string[], options: string[]) => {
    if (options.find((o) => o === "-h" || o === "--help")) {
      print(`\n${docs.name} – ${docs.short}`);
      return;
    }

    if (args.length < 2) {
      print(`\ncp: missing file operand`);
      return;
    }

    const source = args[0];
    const target = args[1];

    const result = fileSystem.cp(path.p, source, target);
    if (result === "bad_source") {
      print(`\ncp: cannot stat '${source}': No such file or directory`);
    } else if (result === "bad_target") {
      print(`\ncp: cannot create regular file '${target}': No such file or directory`);
    } else if (result === "file_exists") {
      print(`\ncp: cannot overwrite '${target}': File exists`);
    }
  };
  return { docs, app };
}
