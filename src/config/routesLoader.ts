// Environment
import { NODE_ENV } from '../config/environment';

// Dependencies
import { IRoute } from '../entities/route.interface';
import fg from 'fast-glob';

async function routesLoader(): Promise<IRoute[]> {
  const routes: IRoute[] = [];

  if (NODE_ENV === 'development') {
    await fg.sync('src/infra/routes/**.route.ts').map(async (file) => {
      const Router = await import(`../../${file}`);
      const router = new Router.default();
      routes.push(router);
    });
  }

  if (NODE_ENV === 'production') {
    await fg.sync('dist/infra/routes/**.route.js').map(async (file) => {
      const Router = await import(`../../${file}`);
      const router = new Router.default();
      routes.push(router);
    });
  }

  return routes;
}

export default routesLoader;
