const fetchItems = async () => {
  const url = `https://store.xsolla.com/api/v2/project/${process.env.NEXT_PUBLIC_XSOLLA_PROJECT_ID}/items?locale=en`
  
  const resp = await fetch(url, 
    { cache: "no-store" }
  );
  return resp.json();
};

const fetchUser = async (token: string) => {
  const url = "https://login.xsolla.com/api/users/me"
  const resp = await fetch(url,
    {
      headers: {
        Authorization: token
      }
    }
  );  
  return resp.json();
}

const XsollaApi = {
  fetchUser,
  fetchItems
}

export default XsollaApi