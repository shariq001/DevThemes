const url = "https://txhmkc5q7ew55bad.private.blob.vercel-storage.com/saas-landing.zip?vercel-blob-valid-until=1785185603440&vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfdFhIbWtjNXE3RXc1NWJhZCIsIm93bmVySWQiOiJ0ZWFtX1dVYWR2SkZuMWR0OFhva2dhVENiV0NUZSIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg1MjI3NDA4ODcyLCJpYXQiOjE3ODUxODQyMTE0Nzl9.UUzgdxnSGg7rPq6PItcr4QdlO_X8KUxxPaNWa2qJIHg&vercel-blob-signature=oiGU2weAGaHK3vECc-oExWICQMKFTmBxvaAxx1VNrbc";

async function testFetch() {
  console.log("Fetching URL...");
  try {
    const res = await fetch(url);
    console.log("Status:", res.status);
    console.log("Status Text:", res.statusText);
    const text = await res.text();
    console.log("Body preview:", text.substring(0, 200));
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testFetch();
