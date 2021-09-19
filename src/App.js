import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  SearchProvider,
  Results,
  SearchBox,
  Sorting
} from "@elastic/react-search-ui";
import ResultView from "./ResultView";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import Layout from "./Layouts/Layout";

const connector = new AppSearchAPIConnector({
  searchKey: "search-3bzibnpf63zphjuoy89ibz1d",
  engineName: "person-search",
  endpointBase: "https://person-finder.ent.eastus2.azure.elastic-cloud.com"
});

const configurationOptions = {
	apiConnector: connector,
	autocompleteQuery: {
		suggestions: {
			types: {
				documents: {
					//the search will give 5 autocomplete suggestions when the user is typing
					fields: ["name"]
				}
			},
			size: 5
		}
	},
	searchQuery: {
		//search by name
		search_fields: {
			name: {}
		},
		
		//display the avatar, name, description, and email of the "person" 
		result_fields: {
			avatar: {
				raw: {}
			},
			name: {
				snippet: {
					size: 70,
					fallback: true
				}
			},
			description: {
				snippet: {
					size: 100,
					fallback: true
				}
			},
			email: {
				snippet: {
					size: 70,
					fallback: true
				}
			}
		}
	}
};

export default function App() {
	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
			<Layout 
				header = {
					<SearchBox autocompleteSuggestions ={true}/>
				}
				bodyContent= {<Results titleField="name" urlField="avatar" resultView={ResultView} />}
				bodyHeader={
					<>
						<PagingInfo />
						<ResultsPerPage />
					</>
				}
				bodyFooter={<Paging />}
			/>
			</div>
		</SearchProvider>
  );
}