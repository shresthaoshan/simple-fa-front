import { BlogProvider } from "./BlogContext";
import { HighlightsProvider } from "./HighlightsContext";
import { NewsProvider } from "./NewsContext";
import { SportProvider } from "./SportContext";

const Provider = ({ children }) => {
	return (
		<SportProvider>
			<NewsProvider>
				<BlogProvider>
					<HighlightsProvider>{children}</HighlightsProvider>
				</BlogProvider>
			</NewsProvider>
		</SportProvider>
	);
};

export default Provider;
