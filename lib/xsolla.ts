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

const createOrder = async ({projectId, sku, sandbox, token}: {projectId: string, sku: string, sandbox: boolean,token?: string}) => {
  const resp = await fetch(
    `https://store.xsolla.com/api/v2/project/${projectId}/payment/item/${sku}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        sandbox,
        quantity: 1,
        settings: {
          ui: {
            desktop: {
              header: {
                is_visible: true,
                visible_logo: true,
                visible_name: true,
                visible_purchase: true,
                type: 'normal',
                close_button: false
              }
            }
          }
        }
      })
    }
  );
  return resp.json();
}

const fetchOrder = async ({projectId, orderId, token}: {projectId: string, orderId: string, token?: string}) => {
  const resp = await fetch(
    `https://store.xsolla.com/api/v2/project/${projectId}/order/${orderId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return resp.json();
}

const XsollaApi = {
  fetchUser,
  fetchItems,
  createOrder,
  fetchOrder
}

export default XsollaApi