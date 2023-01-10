const staticFiles = /* @__PURE__ */ new Set(["/fonts%2Fhkgrotesk-bold.eot", "/fonts%2Fhkgrotesk-bold.woff", "/fonts%2Fhkgrotesk-bold.woff2", "/fonts%2Fhkgrotesk-medium.eot", "/fonts%2Fhkgrotesk-medium.woff", "/fonts%2Fhkgrotesk-medium.woff2", "/fonts%2Fhkgrotesk-regular.eot", "/fonts%2Fhkgrotesk-regular.woff", "/fonts%2Fhkgrotesk-regular.woff2", "/images%2FANSA-BG2.webp", "/images%2FAnsa-01.webp", "/images%2FAnsa-04.jpg", "/images%2FAnsa-07.jpg", "/images%2FAnsa-11.jpg", "/images%2FAnsa-12.jpg", "/images%2FAnsa-13.webp", "/images%2FAnsa-14.webp", "/images%2FAnsa-15.jpg", "/images%2FAnsa-16.jpg", "/images%2FAnsa-17.jpg", "/images%2FAnsa-18.jpg", "/images%2FAnsa-20big.jpg", "/images%2FAnsa-20small.webp", "/images%2FAnsa-21big.jpg", "/images%2FAnsa-21small.jpg", "/images%2FAnsa-21small.webp", "/images%2FAnsa-22banner.jpg", "/images%2FAnsa-22big.webp", "/images%2FAnsa-22small.webp", "/images%2FAnsa_19.jpg", "/images%2Fbackground.jpg", "/images%2Ffacebook.svg", "/images%2Fhattie.jpg", "/images%2Ficons8-instagram(4).svg", "/images%2Ficons8-tiktok(1).svg", "/images%2Ficons8-tiktok.svg", "/images%2Finstagram.svg", "/images%2Fjose.jpg", "/images%2Flocation.jpg", "/images%2Flogo.svg", "/images%2Flogo1.svg", "/images%2Fmarianna.jpg", "/images%2Fnat.jpg", "/images%2Ftwitter.svg"]);
const handler = async (request, { next }) => {
  const { pathname } = new URL(request.url);
  if (staticFiles.includes(pathname) || pathname.startsWith("assets/")) {
    return next();
  }
  console.log("Hello world");
  return new Response("Hello World!");
};
export {
  handler
};
