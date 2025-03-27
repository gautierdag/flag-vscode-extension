# Country Flag Hover

A simple VS Code extension that shows country flag emojis when hovering over ISO country codes in your code.

## Features

This extension detects ISO country codes in your text and displays the corresponding flag emoji when you hover over them:

- Supports both ISO 3166-1 alpha-2 (two-letter) and alpha-3 (three-letter) country codes
- Works in JavaScript, TypeScript, JSON, Python, Markdown, and plain text files
- Instantly recognizes country codes without any configuration

![Feature Preview](./images/preview.png)

## How It Works

When you hover over text in a supported file type:

1. The extension identifies if the text under your cursor is a valid ISO country code
2. If it is, a hover tooltip appears with the corresponding country flag emoji
3. Both uppercase and lowercase country codes are supported

## Examples

This works on country codes in various contexts, including:

```javascript
// Two-letter codes
const countryCode = "US"; // 🇺🇸
const europeanCountries = ["DE", "FR", "IT", "ES"]; // 🇩🇪 🇫🇷 🇮🇹 🇪🇸

// Three-letter codes
const olympicTeam = "JPN"; // 🇯🇵
const destinations = {
  "CAN": "Toronto",
  "MEX": "Mexico City",
  "BRA": "Rio de Janeiro"
}; // 🇨🇦 🇲🇽 🇧🇷
```

## Supported Languages

- JavaScript
- TypeScript
- JSON
- Python
- Markdown
- Plain text

## Requirements

No additional requirements or dependencies.

## Extension Settings

This extension doesn't add any settings to VS Code.

## Known Limitations

- The extension only detects standalone country codes and may not work if the country code is part of a larger word
- Only standard ISO 3166-1 country codes are supported

## Release Notes

### 0.0.1

Initial release of the Country Flag Hover extension:

- Support for ISO 3166-1 alpha-2 and alpha-3 country codes
- Hover display of country flag emojis
- Support for multiple programming languages and text formats

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

**Enjoy!**
