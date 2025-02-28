import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/product",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    getAllProducts: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();

        console.log(filter, "filter");

        if (filter?.pagination) {
          // params.push(`page=${filter.pagination?.page}`);
          // params.push(`limit=${filter.pagination?.limit}`);
          params.append("page", filter.pagination.page);
          params.append("limit", filter.pagination.limit);
          console.log(filter.pagination.page, "api");
        }
        if (filter?.sort) {
          // params.push(`sort=${filter.sort}`);
          params.append("sort", filter.sort);
        }
        if (filter?.filters?.brand?.length > 0) {
          // params.push(`brand=${filter.filters.brand.join(",")}`);

          if (filter?.filters?.brand?.length === 1) {
            params.append("brand", filter.filters.brand?.[0]);
          } else {
            params.append("brand", filter.filters.brand.join(","));
          }
        }
        if (filter?.filters?.category?.length > 0) {
          if (filter?.filters?.category?.length === 1) {
            params.append("category", filter.filters.category?.[0]);
          } else {
            params.append("category", filter.filters.category.join(","));
          }
        }
        if (filter?.searchTerm) {
          // params.push(`searchTerm=${encodeURIComponent(filter.searchTerm)}`);
          params.append("searchTerm", encodeURIComponent(filter.searchTerm));
        }

        if (filter?.shop) {
          params.append("shop", filter.shop);
        }

        return {
          url: "/product",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),

    updateProduct: builder.mutation({
      query: (payload) => ({
        url: `/product/${payload?._id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
