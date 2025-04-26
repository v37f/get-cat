const catApiKey = import.meta.env.VITE_CAT_API_KEY;

const headers = new Headers({
  'Content-Type': 'application/json',
  'x-api-key': catApiKey,
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};

export const fetchCatImageUrl = () => {
  return fetch('https://api.thecatapi.com/v1/images/search', requestOptions).then((response) =>
    response.text()
  );
};
