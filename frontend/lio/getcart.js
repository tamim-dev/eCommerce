export default async function GetCart() {
    const data = await fetch(
        "http://localhost:8000/api/v1/product/allcart"
    );
    return data.json();
}
