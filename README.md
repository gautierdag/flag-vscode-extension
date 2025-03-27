# Country Flag Inline

A simple VS Code extension that shows country flag emojis next to ISO country codes in your code.

## Features

This extension detects ISO country codes in your text and displays the corresponding flag emoji inline:

- Supports both ISO 3166-1 alpha-2 (two-letter) and alpha-3 (three-letter) country codes
- Works in JavaScript, TypeScript, JSON, Python, Markdown, and plain text files
- Instantly recognizes country codes without any configuration
- Shows flag emojis directly in the editor without requiring hover
- Hover over country codes to see the full country name and flag

## How It Works

In supported file types:

1. The extension scans your document for valid ISO country codes
2. When a country code is found, its corresponding flag emoji is shown next to it
3. The flags appear automatically as you type or open files
4. Provides a hover tooltip showing the country name when you hover over a country code

## Examples

Country codes in various contexts will have their flags displayed inline:

```javascript
// Two-letter codes
const countryCode = "US 🇺🇸";
const shipping = {
  "CA 🇨🇦": "Canada", // CA 
  "MX 🇲🇽: "Mexico", // MX 
  "BR 🇧🇷: "Brazil" // BR 
};

// Three-letter codes
const olympicTeam = "JPN 🇯🇵";
const destinations = {
  "CAN": "Toronto",  // CAN 🇨🇦
  "MEX": "Mexico City", // MEX 🇲🇽
  "BRA": "Rio de Janeiro" // BRA 🇧🇷
};
```

## Supported Languages

- JavaScript (.js)
- TypeScript (.ts)
- JSON (.json)
- Python (.py)
- Markdown (.md)
- Plain text (.txt)

## Requirements

No additional requirements or dependencies.

## Extension Settings

This extension doesn't add any settings to VS Code.

## Known Limitations

- The extension only detects standalone country codes and may not work if the country code is part of a larger word
- Only standard ISO 3166-1 country codes are supported

## Release Notes

### 0.0.2

- Added hover functionality that displays country name when hovering over country codes

### 0.0.1

- Initial release
- Support for ISO 3166-1 alpha-2 and alpha-3 country codes
- Inline display of country flag emojis next to country codes
- Support for multiple programming languages and text formats

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

**Enjoy!**
