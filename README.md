<div align="center">
  <h1>WR.DO</h1>
  <p><a href="https://discord.gg/AHPQYuZu3m">Discord</a> · English | <a href="/README-zh.md">简体中文</a></p>
  <p>Make Short Links, Manage DNS Records, Email Support.</p>
  <!-- <img src="https://wr.do/_static/images/light-preview.png"/> -->
</div>

## Features

- 🔗 **URL Shortening:** Generate short links with visitor analytic and password
- 📮 **Email Support:** Receive emails and send emails
- 🌐 **Multi-Tenant Support:** Manage multiple DNS records seamlessly
- ⚡ **Instant Record Creation:** Set up CNAME, A, and other records quickly
- 📸 **Screenshot API:** Access to screenshot API.
- 💯 **Meta Scraping API:** Access to meta scraping API.
- 😀 **Permission Management:** A convenient admin panel for auditing
- 🔒 **Secure & Reliable:** Built on Cloudflare's robust DNS API
- 💰 **Free Registration:** No cost to create and manage records

## Screenshots

![screenshot](https://wr.do/_static/images/light-preview.png)

![screenshot](https://wr.do/_static/images/example_02.png)

![screenshot](https://wr.do/_static/images/example_01.png)

![screenshot](https://wr.do/_static/images/example_03.png)

## Quick Start

See usage docs about [guide](https://wr.do/docs/quick-start) for quick start.

## Self-hosted Tutorial

### Requirements

- [Vercel](https://vercel.com) to deploy app
- A **domain** name hosted on [Cloudflare](https://dash.cloudflare.com/)

See more docs about [developer](https://wr.do/docs/developer/installation).

### Email worker

See docs about [email worker](https://wr.do/docs/developer/cloudflare-email-worker).

## Local development

copy `.env.example` to `.env` and fill in the necessary environment variables.

```bash
git clone https://github.com/oiov/wr.do
cd wr.do
pnpm install

# run on localhost:3000
pnpm dev
```

## Legitimacy review

- To avoid abuse, applications without website content will be rejected
- To avoid domain name conflicts, please check before applying
- Completed website construction or released open source project (ready to build website for open source project)
- Political sensitivity, violence, pornography, link jumping, VPN, reverse proxy services, and other illegal or sensitive content must not appear on the website

**Administrators will conduct domain name checks periodically to clean up domain names that violate the above rules, have no content, and are not open source related**

## Community Group

- Discord: https://discord.gg/AHPQYuZu3m

## License

[MIT](/LICENSE.md)

## Star History

<a href="https://star-history.com/#oiov/wr.do&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=oiov/wr.do&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=oiov/wr.do&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=oiov/wr.do&type=Date" />
 </picture>
</a>