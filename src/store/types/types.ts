export enum LoadingEnum {
    initial = 'initial',
    fetching = 'fetching',
    success = 'success',
    error = 'error',
    loadingMore = 'loadingMore',
}
export type NotificationType = 'success' | 'info' | 'warning' | 'error';


export type NotificationResponse = {
    orderId: string
    route: string
}
