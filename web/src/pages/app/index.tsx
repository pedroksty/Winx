import { gql, useQuery } from "@apollo/client"
import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { GetServerSideProps } from "next"
import { useMeQuery } from "../../graphql/generated/graphql"
import { getServerPageGetProducts } from "../../graphql/generated/page"
import { ssrGetProducts } from "../../graphql/generated/pagePublic"
import { withApollo } from "../../lib/apollo"


function Home({ products }) {
  const { user } = useUser()
  const { data: me } = useMeQuery()



  return (
    <div className="text-violet-500" >
      <h1>hellow woadrld</h1>

      <pre>
        {JSON.stringify(me, null, 2)}
      </pre>

      {/* <pre>
        {JSON.stringify(products, null, 2)}
      </pre> */}

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <a href="/api/auth/logout">logout</a>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const { accessToken } = await getAccessToken(req, res)

    console.log(accessToken)

    // const { props } = await getServerPageGetProducts({}, ctx)

    // console.log(props.data.products)

    return {
      props: {
        // products: props.data.products,
      }
    }


  }
})

export default withApollo(
  ssrGetProducts.withPage()(Home)
)