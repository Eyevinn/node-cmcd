# node-cmcd

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Slack](http://slack.streamingtech.se/badge.svg)](http://slack.streamingtech.se)

NPM library for [Common Media Client Data (CTA-5004)](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf)

## Example

```javascript
import { createPayload } from "@eyevinn/cmcd";

const url: URL;
url = new URL("https://my.domain/file?CMCD=d%3D10000%2Csid%3D%22foobar%22");
const payload = createPayload(url.searchParams);
console.log(payload.objectDuration);
```

# Support

Join our [community on Slack](http://slack.streamingtech.se) where you can post any questions regarding any of our open source projects. Eyevinn's consulting business can also offer you:

- Further development of this component
- Customization and integration of this component into your platform
- Support and maintenance agreement

Contact [sales@eyevinn.se](mailto:sales@eyevinn.se) if you are interested.

# About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This give us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!