class Pinata {
  pinata_api_key: string;
  pinata_secret_api_key: string;
  private _baseURI = "https://api.pinata.cloud/pinning";

  constructor(key: string, secret: string) {
    this.pinata_api_key = key;
    this.pinata_secret_api_key = secret;

    this.pinFileToIPFS = this.pinFileToIPFS.bind(this);
    this.pinJsonToIPFS = this.pinJsonToIPFS.bind(this);
  }

  private get headers(): {
    pinata_api_key: string;
    pinata_secret_api_key: string;
  } {
    return {
      pinata_api_key: this.pinata_api_key,
      pinata_secret_api_key: this.pinata_secret_api_key,
    };
  }

  get baseURI(): string {
    return this._baseURI;
  }

  set baseURI(uri: string) {
    this._baseURI = uri;
  }

  async pinFileToIPFS(file: any) {
    const data = new FormData();
    data.append("file", file);
    const headers = this.headers;
    return fetch(`${this.baseURI}/pinFileToIPFS`, {
      body: data,
      method: "POST",
      headers,
    });
  }

  async pinJsonToIPFS(
    json: any,
    meta?: { name: string; [key: string]: string | number | boolean | null }
  ) {
    // return this.post("/pinJSONToIPFS", json);
    let pinataMetadata;
    const pinataContent = json;
    if (meta) {
      // <https://docs.pinata.cloud/api-pinning/pin-json>
      const { name, ...rest } = meta;
      pinataMetadata = { name, keyvalues: rest };
    }
    const data = {
      pinataMetadata,
      pinataContent,
    };

    return fetch(`${this.baseURI}/pinJSONToIPFS`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
    });
  }
}

export { Pinata };
