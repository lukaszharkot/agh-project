import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/Avatar"
  import React, { useState, useEffect } from 'react';
  import { fetchOrders } from "@/config/methods";

  export function RecentSales() { 
      const [order, setOrder] = useState([]);
      const [sumList, setSumList] = useState([]);
      
      useEffect(() => {
        fetchOrders().then((data) => {
          setOrder(data);
          const sums = data.map((order) =>
            order.products.reduce((total, product) => total + product.price, 0)
          );
          setSumList(sums);
        });
      },[]);

      useEffect(() => {
        console.log(order);
        console.log(sumList);
      }, [order, sumList]);

    if (order.length > 0){
      return (
        <div className="space-y-8">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>{`${order[order.length - 1]?.name.charAt(0)}${order[order.length - 1]?.surname.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{order[order.length - 1]?.name} {order[order.length - 1]?.surname}</p>
              <p className="text-sm text-muted-foreground">{order[order.length - 1]?.buyer}</p>
            </div>
            <div className="ml-auto font-medium">+${sumList[sumList.length - 1]}</div>
          </div>
          {order.length > 1 && (
           <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>{`${order[order.length - 2]?.name.charAt(0)}${order[order.length - 2]?.surname.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{order[order.length - 2]?.name} {order[order.length - 2]?.surname}</p>
              <p className="text-sm text-muted-foreground">{order[order.length - 2]?.buyer}</p>
            </div>
            <div className="ml-auto font-medium">+${sumList[sumList.length - 2]}</div>
          </div>
          )}
          {order.length > 2 && (
           <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>{`${order[order.length - 3]?.name.charAt(0)}${order[order.length - 3]?.surname.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{order[order.length - 3]?.name} {order[order.length - 3]?.surname}</p>
              <p className="text-sm text-muted-foreground">{order[order.length - 3]?.buyer}</p>
            </div>
            <div className="ml-auto font-medium">+${sumList[sumList.length - 3]}</div>
          </div>
          )}
          {order.length > 3 && (
           <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>{`${order[order.length - 4]?.name.charAt(0)}${order[order.length - 4]?.surname.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{order[order.length - 4]?.name} {order[order.length - 4]?.surname}</p>
              <p className="text-sm text-muted-foreground">{order[order.length - 4]?.buyer}</p>
            </div>
            <div className="ml-auto font-medium">+${sumList[sumList.length - 4]}</div>
          </div>
          )}
          {order.length > 4 && (
           <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>{`${order[order.length - 5]?.name.charAt(0)}${order[order.length - 5]?.surname.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{order[order.length - 5]?.name} {order[order.length - 5]?.surname}</p>
              <p className="text-sm text-muted-foreground">{order[order.length - 5]?.buyer}</p>
            </div>
            <div className="ml-auto font-medium">+${sumList[sumList.length - 5]}</div>
          </div>
          )}
        </div>
      )
    } else {
      return(
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-muted-foreground">No recent sales</p>
        </div>
      )
    } 
  }