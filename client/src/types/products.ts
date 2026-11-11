// Shape of a Stripe Product as serialized by the FastAPI backend.
interface Price {
  _data: {
    id: string;
    unit_amount: number | null;
    currency: string;
  };
}

interface Product {
  _data: {
    id: string;
    name: string;
    description: string | null;
    active: boolean;
    images: string[];
    metadata?: Record<string, string>;
    default_price: Price | null;
  };
}

export type { Product, Price };
