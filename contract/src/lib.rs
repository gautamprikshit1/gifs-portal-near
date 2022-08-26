use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedSet;
use near_sdk::{
    near_bindgen,
    serde::{Deserialize, Serialize},
    AccountId, PanicOnDefault,
};

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: AccountId,
    pub votes: u64,
}

#[near_bindgen]
#[derive(PanicOnDefault, BorshSerialize, BorshDeserialize)]
pub struct Contract {
    pub gif_count: u64,
    pub gifs_list: UnorderedSet<ItemStruct>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new() -> Self {
        Self {
            gif_count: 0,
            gifs_list: UnorderedSet::new(b"u"),
        }
    }

    pub fn add_gif(&mut self, gif_link: String, user_address: AccountId) {
        let new_gif = &ItemStruct {
            gif_link,
            user_address,
            votes: 0,
        };

        self.gifs_list.insert(new_gif);
        self.gif_count += 1;
    }

    pub fn get_gifs(&self) -> Vec<ItemStruct> {
        self.gifs_list.to_vec()
    }

    pub fn update_gif(&mut self, gif_url: String) {
        for mut item in self.gifs_list.iter() {
            if item.gif_link == gif_url {
                item.votes += 1;
                break;
            }
        }
    }
}
