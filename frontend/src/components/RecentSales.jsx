import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/Avatar"
  import React, { useState, useEffect } from 'react';
  import { fetchOrders } from "@/config/methods";

  export function RecentSales() { 
      const [order, setOrder] = useState([]);
      useEffect(() => {
        fetchOrders().then(setOrder)
      },[]);
    
      useEffect(() => {
        console.log(order)
      },[order]);
    
      
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
          <div className="ml-auto font-medium">+${order[order.length - 1]?.sum}</div>
        </div>
        <div className="flex items-center">
          <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>{`${order[order.length - 2]?.name.charAt(0)}${order[order.length - 2]?.surname.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order[order.length - 2]?.name} {order[order.length - 2]?.surname}</p>
            <p className="text-sm text-muted-foreground">{order[order.length - 2]?.buyer}</p>
          </div>
          <div className="ml-auto font-medium">+${order[order.length - 2]?.sum}</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>{`${order[order.length - 3]?.name.charAt(0)}${order[order.length - 3]?.surname.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order[order.length - 3]?.name} {order[order.length - 3]?.surname}</p>
            <p className="text-sm text-muted-foreground">{order[order.length - 3]?.buyer}</p>
          </div>
          <div className="ml-auto font-medium">+${order[order.length - 3]?.sum}</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/04.png" alt="Avatar" />
            <AvatarFallback>{`${order[order.length - 4]?.name.charAt(0)}${order[order.length - 4]?.surname.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order[order.length - 4]?.name} {order[order.length - 4]?.surname}</p>
            <p className="text-sm text-muted-foreground">{order[order.length - 4]?.buyer}</p>
          </div>
          <div className="ml-auto font-medium">+${order[order.length - 4]?.sum}</div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/05.png" alt="Avatar" />
            <AvatarFallback>{`${order[order.length - 5]?.name.charAt(0)}${order[order.length - 5]?.surname.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order[order.length - 5]?.name} {order[order.length - 5]?.surname}</p>
            <p className="text-sm text-muted-foreground">{order[order.length - 5]?.buyer}</p>
          </div>
          <div className="ml-auto font-medium">+${order[order.length - 5]?.sum}</div>
        </div>
      </div>
    )
  }