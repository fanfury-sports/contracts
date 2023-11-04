# Smart contracts for Fury Outposts

This repository contains the source code for the core smart contracts of Fury Protocol. Smart contracts are meant to be compiled to `.wasm` files and uploaded to the Cosmos chains.

## Audits

See reports for red-bank and rover [here][1].

## Bug bounty

A bug bounty is currently open for these contracts. See details [here][2].

## Verify contracts

### For contracts deployed on the Osmosis chain

1. Install [Osmosisd][3]

2. Get the wasm binary executable on your local machine.

   ```bash
   git clone https://github.com/fury-protocol/contracts.git
   git checkout <commit-id>
   cargo make rust-optimizer
   ```

   Note: Intel/Amd 64-bit processor is required. While there is experimental ARM support for CosmWasm/rust-optimizer, it's discouraged to use in production and the wasm bytecode will not match up to an Intel compiled wasm file.

3. Download the wasm from the chain.

   ```bash
   osmosisd query wasm code $CODEID -- $NODE download.wasm
   ```

4. Verify that the diff is empty between them. If any value is returned, then the wasm files differ.

   ```bash
   diff artifacts/$CONTRACTNAME.wasm download.wasm
   ```

5. Alternatively, compare the wasm files' checksums:

   ```bash
   sha256sum artifacts/$CONTRACTNAME.wasm download.wasm
   ```

## Environment set up

- Install [rustup][4]. Once installed, make sure you have the wasm32 target:

  ```bash
  rustup default stable
  rustup update stable
  rustup target add wasm32-unknown-unknown
  ```

- Install [cargo-make][5]

  ```bash
  cargo install --force cargo-make
  ```

- Install [Docker][6]

- Install [Node.js v16][7]

- Install [Yarn][8]

- Create the build folder:

   ```bash
   cd scripts
   yarn
   yarn build
   ```

- Compile all contracts:

  ```bash
  cargo make rust-optimizer
  ```

- Formatting:

   ```bash
   cd scripts
   yarn format
   yarn lint
   ```

This compiles and optimizes all contracts, storing them in `/artifacts` directory along with `checksum.txt` which contains sha256 hashes of each of the `.wasm` files (The script just uses CosmWasm's [rust-optimizer][9]).

**Note:** Intel/Amd 64-bit processor is required. While there is experimental ARM support for CosmWasm/rust-optimizer, it's discouraged to use in production.

## Deployment

When the deployment scripts run for the first time, it will upload code IDs for each contract, instantiate each contract, initialize assets, and set oracles. If you want to redeploy, you must locally delete the file with `.json` extension (e.g. `devnet-deployer-owner.json`) in the artifacts directory.

Everything related to deployment must be ran from the `scripts` directory.

Each outpost has a config file for its respective deployment and assets.

For Osmosis:

```bash
cd scripts

# for devnet deployment with deployerAddr set as owner & admin:
yarn deploy:osmosis-devnet

# for mainnet deployment:
yarn deploy:osmosis-mainnet
```

## Schemas

```bash
cargo make --makefile Makefile.toml generate-all-schemas
```

Creates JSON schema files for relevant contract calls, queries and query responses (See: [cosmwams-schema][10]).

## Linting

`rustfmt` is used to format any Rust source code:

```bash
cargo +nightly fmt
```

`clippy` is used as a linting tool:

```bash
cargo make clippy
```

## Testing

Integration tests (task `integration-test` or `test`) use `.wasm` files. They have to be generated with `cargo make build`.

Run unit tests:

```bash
cargo make unit-test
```

Run integration tests:

```bash
cargo make integration-test
```

Run all tests:

```bash
cargo make test
```

## Deployments

### osmosis-1

| Contract               | Address                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| fury-address-provider  | [`osmo1g677w7mfvn78eeudzwylxzlyz69fsgumqrscj6tekhdvs8fye3asufmvxr`][11] |
| fury-account-nft       | [`osmo1450hrg6dv2l58c0rvdwx8ec2a0r6dd50hn4frk370tpvqjhy8khqw7sw09`][12] |
| fury-credit-manager    | [`osmo1f2m24wktq0sw3c0lexlg7fv4kngwyttvzws3a3r3al9ld2s2pvds87jqvf`][13] |
| fury-health            | [`osmo1pdc49qlyhpkzx4j24uuw97kk6hv7e9xvrdjlww8qj6al53gmu49sge4g79`][14] |
| fury-incentives        | [`osmo1nkahswfr8shg8rlxqwup0vgahp0dk4x8w6tkv3rra8rratnut36sk22vrm`][15] |
| fury-oracle            | [`osmo1mhznfr60vjdp2gejhyv2gax9nvyyzhd3z0qcwseyetkfustjauzqycsy2g`][16] |
| fury-params            | [`osmo1nlmdxt9ctql2jr47qd4fpgzg84cjswxyw6q99u4y4u4q6c2f5ksq7ysent`][17] |
| fury-red-bank          | [`osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg`][18] |
| fury-rewards-collector | [`osmo1urvqe5mw00ws25yqdd4c4hlh8kdyf567mpcml7cdve9w08z0ydcqvsrgdy`][19] |
| fury-swapper           | [`osmo1wee0z8c7tcawyl647eapqs4a88q8jpa7ddy6nn2nrs7t47p2zhxswetwla`][20] |
| fury-zapper            | [`osmo17qwvc70pzc9mudr8t02t3pl74hhqsgwnskl734p4hug3s8mkerdqzduf7c`][21] |

### devnet (Osmosis)

| Contract               | Address                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| fury-address-provider  | [`osmo1g677w7mfvn78eeudzwylxzlyz69fsgumqrscj6tekhdvs8fye3asufmvxr`][11] |
| fury-account-nft       | [`osmo1450hrg6dv2l58c0rvdwx8ec2a0r6dd50hn4frk370tpvqjhy8khqw7sw09`][12] |
| fury-credit-manager    | [`osmo1f2m24wktq0sw3c0lexlg7fv4kngwyttvzws3a3r3al9ld2s2pvds87jqvf`][13] |
| fury-health            | [`osmo1kqzkuyh23chjwemve7p9t7sl63v0sxtjh84e95w4fdz3htg8gmgspua7q4`][22] |
| fury-incentives        | [`osmo1nkahswfr8shg8rlxqwup0vgahp0dk4x8w6tkv3rra8rratnut36sk22vrm`][15] |
| fury-oracle            | [`osmo1mhznfr60vjdp2gejhyv2gax9nvyyzhd3z0qcwseyetkfustjauzqycsy2g`][16] |
| fury-params            | [`osmo1aye5qcer5n52crrkaf35jprsad2807q6kg3eeeu7k79h4slxfausfqhc9y`][23] |
| fury-red-bank          | [`osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg`][18] |
| fury-rewards-collector | [`osmo1urvqe5mw00ws25yqdd4c4hlh8kdyf567mpcml7cdve9w08z0ydcqvsrgdy`][19] |
| fury-swapper           | [`osmo1wee0z8c7tcawyl647eapqs4a88q8jpa7ddy6nn2nrs7t47p2zhxswetwla`][20] |
| fury-zapper            | [`osmo17qwvc70pzc9mudr8t02t3pl74hhqsgwnskl734p4hug3s8mkerdqzduf7c`][21] |

### neutron-1

| Contract                  | Address                                                                    |
| ------------------------- | -------------------------------------------------------------------------- |
| fury-address-provider     | [`neutron17yehp4x7n79zq9dlw4g7xmnrvwdjjj2yecq26844sg8yu74knlxqfx5vqv`][24] |
| fury-incentives           | [`neutron1aszpdh35zsaz0yj80mz7f5dtl9zq5jfl8hgm094y0j0vsychfekqxhzd39`][25] |
| fury-oracle               | [`neutron1dwp6m7pdrz6rnhdyrx5ha0acsduydqcpzkylvfgspsz60pj2agxqaqrr7g`][26] |
| fury-red-bank             | [`neutron1n97wnm7q6d2hrcna3rqlnyqw2we6k0l8uqvmyqq6gsml92epdu7quugyph`][27] |
| fury-rewards-collector    | [`neutron1h4l6rvylzcuxwdw3gzkkdzfjdxf4mv2ypfdgvnvag0dtz6x07gps6fl2vm`][28] |
| fury-swapper              | [`neutron1udr9fc3kd743dezrj38v2ac74pxxr6qsx4xt4nfpcfczgw52rvyqyjp5au`][29] |

### pion-1 (Neutron)

| Contract                  | Address                                                                    |
| ------------------------- | -------------------------------------------------------------------------- |
| fury-address-provider     | [`neutron187fjlesys2c0z7xzhu43we4rx7tc4twnr5m6r2u7u5hpm03wvjqs0gk2lp`][30] |
| fury-incentives           | [`neutron187hw8pqfhmxt4tk9star7tkjhu438k566jtgjskz4889pndp2vysh73ezh`][31] |
| fury-oracle               | [`neutron1g4samkydfdyjec424ccucvjcuuls0ql8mfp2glf739mg0uqr74yqhdx9kn`][32] |
| fury-red-bank             | [`neutron15dn9w9vcdkpp2kfjuz4suqh2w8ajyqsgujlykm9x58hsjss5ff7qpmhlln`][33] |
| fury-rewards-collector    | [`neutron1re4v85k6kr8r7f3j4s4vrk3dvlyefc3xeg7jetv2jlpskahs5xrs8d6vw5`][34] |
| fury-swapper              | [`neutron16xdh5w4dynfjrvnfuhv9h2znks94fyt4gp448jhtmjs3xd6smjvqumh9x2`][35] |

### fury-1

| Module Account  | Address                                             |
| --------------- | --------------------------------------------------- |
| `fee_collector` | [`furya17xpfvakm2amg962yls6f84z3kell8c5llvck70`][36] |
| `safety`        | [`furya1s4hgh56can3e33e0zqpnjxh0t5wdf7u3n2mm7a`][37] |

## License

Contents of this repository are open source under [GNU General Public License v3](./LICENSE) or later.

[1]: https://github.com/fury-protocol/fury-audits
[2]: https://immunefi.com/bounty/fury/
[3]: https://docs.osmosis.zone/osmosis-core/osmosisd/
[4]: https://rustup.rs/
[5]: https://github.com/sagiegurari/cargo-make
[6]: https://docs.docker.com/get-docker/
[7]: https://github.com/nvm-sh/nvm
[8]: https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
[9]: https://github.com/CosmWasm/rust-optimizer
[10]: https://github.com/CosmWasm/cosmwasm/tree/main/packages/schema
[11]: https://osmosis.celat.one/osmosis-1/contracts/osmo1g677w7mfvn78eeudzwylxzlyz69fsgumqrscj6tekhdvs8fye3asufmvxr
[12]: https://osmosis.celat.one/osmosis-1/contracts/osmo1450hrg6dv2l58c0rvdwx8ec2a0r6dd50hn4frk370tpvqjhy8khqw7sw09
[13]: https://osmosis.celat.one/osmosis-1/contracts/osmo1f2m24wktq0sw3c0lexlg7fv4kngwyttvzws3a3r3al9ld2s2pvds87jqvf
[14]: https://osmosis.celat.one/osmosis-1/contracts/osmo1pdc49qlyhpkzx4j24uuw97kk6hv7e9xvrdjlww8qj6al53gmu49sge4g79
[15]: https://osmosis.celat.one/osmosis-1/contracts/osmo1nkahswfr8shg8rlxqwup0vgahp0dk4x8w6tkv3rra8rratnut36sk22vrm
[16]: https://osmosis.celat.one/osmosis-1/contracts/osmo1mhznfr60vjdp2gejhyv2gax9nvyyzhd3z0qcwseyetkfustjauzqycsy2g
[17]: https://osmosis.celat.one/osmosis-1/contracts/osmo1nlmdxt9ctql2jr47qd4fpgzg84cjswxyw6q99u4y4u4q6c2f5ksq7ysent
[18]: https://osmosis.celat.one/osmosis-1/contracts/osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg
[19]: https://osmosis.celat.one/osmosis-1/contracts/osmo1urvqe5mw00ws25yqdd4c4hlh8kdyf567mpcml7cdve9w08z0ydcqvsrgdy
[20]: https://osmosis.celat.one/osmosis-1/contracts/osmo1wee0z8c7tcawyl647eapqs4a88q8jpa7ddy6nn2nrs7t47p2zhxswetwla
[21]: https://osmosis.celat.one/osmosis-1/contracts/osmo17qwvc70pzc9mudr8t02t3pl74hhqsgwnskl734p4hug3s8mkerdqzduf7c
[22]: https://osmosis.celat.one/osmosis-1/contracts/osmo1kqzkuyh23chjwemve7p9t7sl63v0sxtjh84e95w4fdz3htg8gmgspua7q4
[23]: https://osmosis.celat.one/osmosis-1/contracts/osmo1aye5qcer5n52crrkaf35jprsad2807q6kg3eeeu7k79h4slxfausfqhc9y
[24]: https://neutron.celat.one/neutron-1/contracts/neutron17yehp4x7n79zq9dlw4g7xmnrvwdjjj2yecq26844sg8yu74knlxqfx5vqv
[25]: https://neutron.celat.one/neutron-1/contracts/neutron1aszpdh35zsaz0yj80mz7f5dtl9zq5jfl8hgm094y0j0vsychfekqxhzd39
[26]: https://neutron.celat.one/neutron-1/contracts/neutron1dwp6m7pdrz6rnhdyrx5ha0acsduydqcpzkylvfgspsz60pj2agxqaqrr7g
[27]: https://neutron.celat.one/neutron-1/contracts/neutron1n97wnm7q6d2hrcna3rqlnyqw2we6k0l8uqvmyqq6gsml92epdu7quugyph
[28]: https://neutron.celat.one/neutron-1/contracts/neutron1h4l6rvylzcuxwdw3gzkkdzfjdxf4mv2ypfdgvnvag0dtz6x07gps6fl2vm
[29]: https://neutron.celat.one/neutron-1/contracts/neutron1udr9fc3kd743dezrj38v2ac74pxxr6qsx4xt4nfpcfczgw52rvyqyjp5au
[30]: https://neutron.celat.one/pion-1/contracts/neutron187fjlesys2c0z7xzhu43we4rx7tc4twnr5m6r2u7u5hpm03wvjqs0gk2lp
[31]: https://neutron.celat.one/pion-1/contracts/neutron187hw8pqfhmxt4tk9star7tkjhu438k566jtgjskz4889pndp2vysh73ezh
[32]: https://neutron.celat.one/pion-1/contracts/neutron1g4samkydfdyjec424ccucvjcuuls0ql8mfp2glf739mg0uqr74yqhdx9kn
[33]: https://neutron.celat.one/pion-1/contracts/neutron15dn9w9vcdkpp2kfjuz4suqh2w8ajyqsgujlykm9x58hsjss5ff7qpmhlln
[34]: https://neutron.celat.one/pion-1/contracts/neutron1re4v85k6kr8r7f3j4s4vrk3dvlyefc3xeg7jetv2jlpskahs5xrs8d6vw5
[35]: https://neutron.celat.one/pion-1/contracts/neutron16xdh5w4dynfjrvnfuhv9h2znks94fyt4gp448jhtmjs3xd6smjvqumh9x2
[36]: https://www.mintscan.io/fury-protocol/accounts/furya17xpfvakm2amg962yls6f84z3kell8c5llvck70
[37]: https://www.mintscan.io/fury-protocol/accounts/furya1s4hgh56can3e33e0zqpnjxh0t5wdf7u3n2mm7a
