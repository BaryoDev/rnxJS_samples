#!/usr/bin/env python3
"""Stamp a built channel: record the build, and version local asset URLs.

The server sends no Cache-Control, so browsers cache heuristically. A stale
bundle would make a channel lie about which build it is showing, which is the
one thing the version stamp exists to prevent.

    stamp.py <dir> <version>
"""
import hashlib
import pathlib
import re
import sys

ASSET = re.compile(
    r'(?<=[\"\'])((?:\./)?(?:styles|index)\.css|(?:\./)?rnx\.global\.js)'
    r'(?:\?v=[^\"\']*)?(?=[\"\'])'
)


def main(target: str, version: str) -> None:
    directory = pathlib.Path(target)
    tag = hashlib.sha1(version.encode()).hexdigest()[:8]

    for path in sorted(directory.glob("*.html")):
        text = path.read_text()

        if path.name == "index.html":
            text = re.sub(
                r"<html\b[^>]*?>",
                lambda m: re.sub(r'\s+data-rnx-version="[^"]*"', "", m.group(0))[:-1]
                + f' data-rnx-version="{version}">',
                text,
                count=1,
            )

        # Local assets only. The CDN URLs are already version-pinned.
        text = ASSET.sub(lambda m: f"{m.group(1)}?v={tag}", text)
        path.write_text(text)

    print(f"  stamped {version} (assets ?v={tag})")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
