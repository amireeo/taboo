import { NgModule, inject } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

const uri = 'https://sapi.skyelectric.com/api'; // Replace with your GraphQL endpoint

@NgModule({
  providers: [
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      
      return {
        link: httpLink.create({ uri }),
        cache: new InMemoryCache(),
      };
    }),
  ],
})
export class GraphQLModule {}