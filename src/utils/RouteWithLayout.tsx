/* eslint  @typescript-eslint/no-explicit-any:0 */
import React from 'react'
import { Route as ReactRouterRoute, RouteProps } from 'react-router-dom'

export interface RouteWithLayoutProps extends RouteProps {
  component: React.FC<any> | React.ComponentClass<any, any>
  layout: React.FC<any> | React.ComponentClass<any, any>
}

export const RouteWithLayout: React.FC<RouteWithLayoutProps> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
  <ReactRouterRoute
    {...rest}
    render={(props) => (
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    )}
  />
)
