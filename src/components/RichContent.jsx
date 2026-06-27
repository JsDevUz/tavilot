import ReactMarkdown from 'react-markdown';

const HTML_PATTERN = /<\/?[a-zа-яёҳқғў][^>]*>/i;
const TAG_NAME_MAP = {
  а: 'a',
  б: 'b',
  бр: 'br',
  див: 'div',
  эм: 'em',
  ҳ1: 'h1',
  ҳ2: 'h2',
  ҳ3: 'h3',
  ҳ4: 'h4',
  ҳ5: 'h5',
  ҳ6: 'h6',
  и: 'i',
  ли: 'li',
  ол: 'ol',
  п: 'p',
  спан: 'span',
  стронг: 'strong',
  ул: 'ul',
};

function normalizeHtmlTags(content) {
  return content.replace(/<\/?\s*([a-zа-яёҳқғў][\wа-яёҳқғў-]*)([^>]*)>/gi, (tag, tagName, rest) => {
    const normalizedName = TAG_NAME_MAP[tagName.toLowerCase()];
    if (!normalizedName) return tag;

    const isClosing = tag.startsWith('</');
    const selfClosing = /\/\s*>$/.test(tag);
    return `<${isClosing ? '/' : ''}${normalizedName}${isClosing ? '' : rest}${selfClosing && !isClosing ? ' /' : ''}>`;
  });
}

function sanitizeHtml(html) {
  if (typeof window === 'undefined' || !html) return html || '';

  const template = document.createElement('template');
  template.innerHTML = html;

  template.content.querySelectorAll('script, style, iframe, object, embed').forEach((node) => node.remove());
  template.content.querySelectorAll('*').forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();

      if (name.startsWith('on') || value.startsWith('javascript:')) {
        node.removeAttribute(attribute.name);
      }
    });
  });

  return template.innerHTML;
}

export default function RichContent({ children }) {
  const content = normalizeHtmlTags(children || '');

  if (!HTML_PATTERN.test(content)) {
    return <ReactMarkdown>{content}</ReactMarkdown>;
  }

  return <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />;
}
