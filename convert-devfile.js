"use strict"
import 'reflect-metadata'
import * as devfileConverter from '@eclipse-che/devfile-converter'
import fs from 'fs'
import yaml from 'js-yaml'
import yargs from 'yargs'

const argv = yargs(process.argv.slice(2))
  .scriptName('convert-devfile')
  .describe('Converts Eclipse Che devfile v1 to v2 schema')
  .positional("v1Yaml", {
      description: 'The source v1 devfile.yaml',
      type: 'string',
      default: "devfile.yaml"
    })
  .positional("v2Yaml", {
      description: 'The destination v2 devfile.yaml',
      type: 'string',
      default: "devfile-v2.yaml"
  })
  .help()
  .alias('help', 'h').argv;

try {
  const fileContents = fs.readFileSync(argv.v1Yaml, 'utf8')
  const data = yaml.load(fileContents)
  console.log(data)
  devfileConverter.v1ToV2(data).then(devFile => {
    console.log(devFile)
    fs.writeFileSync(argv.v2Yaml, yaml.dump(devFile), { flag: 'w' })
  })
} catch (e) {
  console.log(e)
}
