/**
 * Runs before first paint so the saved theme is applied without a flash.
 * Dark is the default when nothing is stored.
 */
export default function ThemeScript() {
  const js = `
try {
  var t = localStorage.getItem("theme");
  if (t === "light") document.documentElement.classList.remove("dark");
  else document.documentElement.classList.add("dark");
} catch (e) {
  document.documentElement.classList.add("dark");
}`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
