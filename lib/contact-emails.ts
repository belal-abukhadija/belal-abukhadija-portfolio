/**
 * The automatic reply a visitor gets after using the contact form.
 *
 * Email clients are far stricter than browsers: no web fonts, no external
 * CSS, little flexbox, and Gmail strips most of <style>. So this is a
 * table layout with every style inline, in the site's two inks on paper.
 *
 * This file imports nothing, so it can be run on its own to preview the email.
 */

export interface ConfirmationInput {
  /** The visitor's name and the chore they asked about, exactly as typed. */
  name: string;
  chore: string;
  owner: {
    name: string;
    role: string;
    location: string;
    domain: string;
    linkedin: string;
    github: string;
    whatsapp: string;
  };
}

const PAPER = "#EFF0EC";
const INK = "#1B2CC1";
const INK_SOFT = "#4856CD";
const MARK = "#FF4C65";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
// Stands in for the site's condensed display face where it is installed.
const DISPLAY = "'Arial Narrow', 'Helvetica Neue', Helvetica, Arial, sans-serif";

/** Everything typed by a visitor goes through this before it touches the HTML. */
export function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function confirmationEmail({ name, chore, owner }: ConfirmationInput) {
  const firstName = owner.name.split(" ")[0];
  const site = `https://${owner.domain}`;
  const safeName = escapeHtml(name);
  const safeChore = escapeHtml(chore);

  const subject = `Got it: ${chore}`;

  const text = [
    `Got it, ${name}.`,
    "",
    "This is now on my list to cross out:",
    `  ${chore}`,
    "",
    "Thanks for writing. Your message reached me, and I'll reply to you myself, usually within an hour.",
    "If you want to add anything in the meantime, just reply to this email.",
    "",
    firstName,
    `${owner.name}, ${owner.role}, ${owner.location}`,
    site,
    "",
    `You got this because someone used the contact form on ${owner.domain} with this address. If that wasn't you, you can ignore it.`,
  ].join("\n");

  const link = (href: string, label: string) =>
    `<a href="${href}" style="color:${INK};font-weight:700;text-decoration:underline;">${label}</a>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your message reached ${escapeHtml(firstName)}. He'll reply to you himself, usually within an hour.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAPER};">
<tr><td align="center" style="padding:32px 16px;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

    <tr><td style="padding:0 8px 40px 8px;font-family:${FONT};font-size:15px;font-weight:800;color:${INK};">
      <a href="${site}" style="color:${INK};text-decoration:none;">${owner.domain}</a>
    </td></tr>

    <tr><td style="padding:0 8px 28px 8px;font-family:${DISPLAY};font-size:52px;line-height:50px;font-weight:800;letter-spacing:-1px;color:${INK};">
      Got it, ${safeName}.
    </td></tr>

    <tr><td style="padding:0 8px 10px 8px;font-family:${FONT};font-size:14px;font-weight:700;color:${INK};">
      Now on my list to cross out
    </td></tr>

    <tr><td style="padding:0 8px 32px 8px;font-family:${DISPLAY};font-size:38px;line-height:42px;font-weight:300;color:${INK};">
      <s style="text-decoration:line-through;text-decoration-color:${MARK};text-decoration-thickness:4px;">${safeChore}</s>
    </td></tr>

    <tr><td style="padding:0 8px 16px 8px;font-family:${FONT};font-size:18px;line-height:28px;color:${INK};">
      Thanks for writing. Your message reached me, and I'll reply to you myself, usually within an hour.
    </td></tr>

    <tr><td style="padding:0 8px 40px 8px;font-family:${FONT};font-size:18px;line-height:28px;color:${INK};">
      If you want to add anything in the meantime, just reply to this email. It comes straight to me.
    </td></tr>

    <tr><td style="padding:0 8px;"><div style="height:2px;line-height:2px;font-size:0;background-color:${INK};">&nbsp;</div></td></tr>

    <tr><td style="padding:24px 8px 4px 8px;font-family:${DISPLAY};font-size:30px;line-height:32px;font-weight:800;color:${INK};">
      ${escapeHtml(firstName)}
    </td></tr>

    <tr><td style="padding:0 8px 18px 8px;font-family:${FONT};font-size:15px;line-height:22px;color:${INK_SOFT};">
      ${escapeHtml(owner.name)}, ${escapeHtml(owner.role)}, ${escapeHtml(owner.location)}
    </td></tr>

    <tr><td style="padding:0 8px 40px 8px;font-family:${FONT};font-size:15px;line-height:26px;color:${INK};">
      ${link(site, owner.domain)}
      &nbsp;&nbsp;&nbsp;${link(owner.linkedin, "LinkedIn")}
      &nbsp;&nbsp;&nbsp;${link(owner.github, "GitHub")}
      &nbsp;&nbsp;&nbsp;${link(`https://wa.me/${owner.whatsapp}`, "WhatsApp")}
    </td></tr>

    <tr><td style="padding:20px 24px;background-color:${INK};font-family:${FONT};font-size:13px;line-height:20px;color:${PAPER};">
      You got this because someone used the contact form on
      <a href="${site}" style="color:${PAPER};text-decoration:underline;">${owner.domain}</a>
      with this address. If that wasn't you, you can ignore it.
    </td></tr>

  </table>

</td></tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}
