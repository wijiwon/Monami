const { Room } = require("../models");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

exports.isRoom = async (req, res, next) => {
    try {
        const { decode } = req;
        // console.log("현재 로그인한 아이디는????????", decode.id)
        // 현재 게임 중인 방에서 내가 방장일 경우, 해당 방의 정보가 전해진다.
        const roomManager = await Room.findOne({ where: { room_manager: decode.id, play: 1 } })
        // console.log("내가 방장이라고????????", roomManager)
        // 현재 게임 중인 방에서 방장이 아닐 경우 해당 if문에서 조건으로 검색한다.
        if (roomManager == null) {
            const room = await Room.findAll({ where: { play: 1 } });
            // console.log("이이이이이이이이잉????", room)
            for (const i of room) {
                const userInRoom = i.dataValues.users_in_room;
                // console.log("userInRoom?????????", userInRoom);

                // console.log("userInRoom에 정말 속해있니?????????",userInRoom.split(','));
                // console.log("userInRoom에 속해있니?????????",userInRoom.split(',').includes(decode.id.toString()));
                if (userInRoom && userInRoom.split(',').includes(decode.id.toString())) {
                    // console.log("%%%%%%%%%%%%%%%%%%%", i.dataValues)
                    req.room = i.dataValues;
                    next();
                }
                else{
                    // console.log("들어오기는 하니.....?")
                    // ---- 속해있지 않을 때 보낼 메세지 작성 ※제대로 작동안됨 ---------
                    return res.send("게임방에 속해있지 않습니다. 다시 접속해주세요")

                }
            }

        }
        else {
            req.room = roomManager;
            next();
        }



    } catch (error) {
        console.log(error)
    }
}

