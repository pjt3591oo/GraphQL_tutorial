package com.example.graphql

import com.apollographql.apollo.ApolloClient

val apolloClient: ApolloClient = ApolloClient.builder()
    .serverUrl("http://10.0.2.2:3000/graphql")
    .build()