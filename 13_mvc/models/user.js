exports.values = [
    { id: 1, login_name: 'yokohama', name: '横浜　太郎', hobby: ['旅行', 'グルメ']},
    { id: 2, login_name: 'tokyo', name: '東京　二郎', hobby: ['スポーツ', 'キャンプ'] },
    { id: 3, login_name: 'osaka', name: '大阪　花子', hobby: ['読書', 'パソコン'] },
]
exports.find = (id) => {
    return this.values.find((value) => value.id == id)
}