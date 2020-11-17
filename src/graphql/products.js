import gql from 'graphql-tag';

export const GetProducts = gql`
  query GetProducts ($limit: Int, $offset: Int){
    products (limit: $limit, offset: $offset, order_by:{name: asc}) {
      id
      name
      vendor_code
      series
      prices {
        price
      }
      short_name
    }
  }
`;

export const AllProducts = gql`
  query AllProducts{
    AllProducts: products {
      id
    }
  }
`;

export const UpdateProduct = gql`
  mutation UpdateProduct ($name: String, $id: String, $code: String){
    UpdateProduct: update_products(_set:{name: $name, vendor_code: $code}, where: {id: {_eq: $id}}){
      returning{
        id,
        name,
        vendor_code,
      }
    }
  }
`;
