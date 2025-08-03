export function openUrl(url: string, openInNewTab = true): void {
  window.open(url, openInNewTab ? '_blank' : '');
}
