
export async function dashboard(){
    const request = await fetch('http://localhost:3030/data/catalog');
    const data = await request.json();
    console.log(data);
}