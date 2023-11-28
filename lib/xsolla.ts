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
}

export default XsollaApi