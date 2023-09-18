import { IRouteBase } from "./types"

export function flattenRoute(routeList: IRouteBase[], deep: boolean = true): IRouteBase[] {
    const result: IRouteBase[] = []

    for (let i = 0; i < routeList.length; i += 1) {
        const route = routeList[i]

        result.push({
            ...route
        })

        if (route.children && deep) {
            result.push(...flattenRoute(route.children, deep))
        }
    }

    return result
}
