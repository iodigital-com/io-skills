import { cp, mkdir, readdir, rmdir } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const starter = fileURLToPath(new URL('../assets/starter', import.meta.url));

async function create(destination) {
  if (!destination || process.argv.length !== 3) throw new Error('Usage: node create.mjs <new-directory>');
  const target = resolve(destination);
  if (target === starter || target.startsWith(starter + sep)) throw new Error('Choose a location outside the bundled starter.');
  // Reserve a new directory so simultaneous runs or an existing project cannot be overwritten.
  await mkdir(target);
  try {
    for (const entry of await readdir(starter)) {
      await cp(join(starter, entry), join(target, entry), { recursive: true, force: false, errorOnExist: true });
    }
  } catch (error) {
    await rmdir(target).catch(() => {}); // Remove only an empty reservation.
    throw error;
  }
  console.log(`Created the review shell at ${target}. Edit project.js to register your project.`);
}

create(process.argv[2]).catch(error => {
  console.error(error.code === 'EEXIST' ? 'The destination already exists. Choose a new directory.' : error.message);
  process.exitCode = 1;
});
